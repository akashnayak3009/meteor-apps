const { LinksCollection } = require("../api/links");

export async function insertLink({ title, url }) {
    await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
  }
  