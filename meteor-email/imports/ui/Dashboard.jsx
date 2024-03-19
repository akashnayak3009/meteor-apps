// @ts-nocheck
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { EmailCollection } from "../api/email";
import { EmailTypeBadge } from "./EmailTypeBadge";
import { Meteor } from 'meteor/meteor';

const Dashboard = () => {
    let authenticatedUser = useTracker(() => Meteor.user());
    let users = useTracker(() => Meteor.users.find().fetch());

    const { emails, isLoading } = useTracker(() => {
        const emailHandler = Meteor.subscribe("emails");

        if (!emailHandler.ready()) {
            return { emails: [], isLoading: true };
        }

        const fetchedEmails = EmailCollection.find()
            .fetch()
        // .map((email) => ({
        //     ...email,
        //     sender: users.find((user) => user._id === email.sender)?.username,
        // }));

        return { emails: fetchedEmails, isLoading: false };
    });

    const handleEmailSubmit = (e) => {
        e.preventDefault();

        const emailPayload = {
            subject: e.target[0].value,
            body: e.target[1].value,
            sender: e.target[2].value,
            tag: e.target[3].value,
            email: e.target[4].value
        }

        if(!emailPayload){
            console.log("All fields are required");
            return;
        }

        Meteor.call("Email.insert", emailPayload, (error, result) => {
            if (error) {
                console.error("There was an error while inserting the email", error);
            } else {
                console.log("Email inserted successfully", result);
            }
        });

    }

    async function handleDeleteEmail({ _id }) {
        try {
            await Meteor.callAsync("Email.delete", { _id });
        } catch (error) {
            console.error("There was an error while deleting the email", error);
        }
    }

    return (
        <div>
            <div className="px-16 py-4 flex justify-between">
                <h1 className="text-4xl font-bold"> Dashboard</h1>
                <div>
                    <h1>{authenticatedUser?.username}</h1>
                    <button
                        onClick={() => {
                            Meteor.logout((err) => {
                                err
                                    ? console.log("Logout Failed", err.message)
                                    : console.log("Logged Out");
                            });
                        }}
                    >
                        LogOut
                    </button>
                </div>
            </div>
            <div className="p-32">
                {isLoading ? (
                    <h1> Loading....</h1>
                ) : (
                    <div>
                        <div className="rounded-md border border-zinc-500 b-zinc-50 shadow-sm">
                            {emails.map((email) => (
                                <div
                                    className="border-zinc-300 border-b p-4 flex gap-x-8 items-center"
                                    key={email.sender}
                                >
                                    <EmailTypeBadge type={email.tag} />
                                    <h3 className="font-bold">{email.sender}</h3>
                                    <h5>{email.subject}</h5>
                                    <p>{email.body}</p>
                                    <p>{email.email}</p>
                                    <div>
                                        <button onClick={() => handleDeleteEmail({ _id: email._id })} className="px-4 py-2 rounded-lg text-red-800 border-zinc-500 font-semibold">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form className="mt-16" onSubmit={handleEmailSubmit}>
                            <div className="flex flex-col items-center space-y-8">
                                <input type="text" placeholder="Subject" id="subject" className="rounded-lg px-4 py-2 bg-zinc-200 border-zinc-500" />
                                <textarea placeholder="Body" id="body" className="rounded-lg px-4 py-2 bg-zinc-200 border-zinc-500" />
                                <select id="userSelect">
                                    {
                                        users.map((user) => (
                                            <option value={user.username} key={user._id}>USER:- {user.username}</option>
                                        ))
                                    }
                                </select>
                                <select id="prioritySelect">
                                    <option value="regular">Regular</option>
                                    <option value="important">Important</option>
                                    <option value="spam">Spam</option>
                                </select>
                                <input type="text" placeholder="Email " id="email" className="rounded-lg px-4 py-2 bg-zinc-200 border-zinc-500" />
                                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-200 border-zinc-500 font-semibold" > Send Email </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
