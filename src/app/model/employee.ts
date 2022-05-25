import { Gender } from "../type/gender";
import { Department } from "./department";

export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    gender: Gender,
    department: Department
}
