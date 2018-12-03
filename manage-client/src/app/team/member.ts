import {Task} from "./task";
import {Request} from "./request";

export class Member {
  fullName: string;
  image: string;
  position: string;
  status: string;
  requests: Request[];
  tasks: Task[];
}
