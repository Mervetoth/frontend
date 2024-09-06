export default interface IUser {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  password?: string;
  address?: string;
  dateOfBirth?: Date;
  roles?: Array<string>;
  gender?: string | null;
  phoneNumber?: string | null;
  walletAddress?: string | null;
  profileImageUrl?: string | null;
}
