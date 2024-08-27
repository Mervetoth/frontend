export default interface IUser {
  id?: string | null;
  username?: string | null;
  email?: string;
  password?: string;
  roles?: Array<string>;
  gender?: string | null;
  phoneNumber?: string | null;
  walletAddress?: string | null;
  profileImageUrl?: string | null;
}
