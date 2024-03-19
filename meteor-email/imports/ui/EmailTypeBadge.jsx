import React from "react";

export const EmailTypeBadge = ({ type }) => {
    switch (type) {
        case "important":
            return (
                <div className="py-2 px-4 bg-green-300 text-green-700 rounded-lg text-sm">
                    Important
                </div>
            );
        case "spam":
            return (
                <div className="py-2 px-4 bg-red-300 text-red-700 rounded-lg text-sm">
                    Spam
                </div>
            );
        default:
            return (
                <div className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg text-sm">
                    Regular
                </div>
            );
    }
};
