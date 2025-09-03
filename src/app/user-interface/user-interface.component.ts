import { PostInterfaceComponent } from '../post-interface/post-interface.component';

export interface UserInterfaceComponent {
  id: string;
  name: string;
  gmail: string;
  password: string;
  location: string;
  phoneNumber: number;
  clothes: PostInterfaceComponent[];
  Admin: boolean;
}
