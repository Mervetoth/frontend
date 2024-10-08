export default interface IIntellectualProperty {
  _id?: string; // MongoDB ObjectId is represented as a string
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected"; // Use a union type for status
  createdAt: Date; // Assuming this is stored and handled as a Date object
  documentUrl?: string;
  owner?: string; // Optional field to represent the owner (MongoDB ObjectId as a string)
  blockchainHash?: string; // Optional blockchain transaction hash
  classification?: string; // Optional classification field for the intellectual property
  keywords?: string[]; // Optional array for keywords
}
