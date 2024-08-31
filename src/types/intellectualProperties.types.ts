export default interface IIntellectualProperty {
  _id?: string; // MongoDB ObjectId will be a string
  title: string;
  description: string;
  status: string;
  createdAt: Date; // Change this to `Date` if you handle it as a Date object
  documentUrl?: string;
}
