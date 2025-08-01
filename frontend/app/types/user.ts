import { userHelper } from "./candidate/candidateUser";
import { userHelper as employerUser } from "./employer/employerUser";


export type User = userHelper | employerUser;