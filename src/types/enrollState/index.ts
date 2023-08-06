import { ICourseTopic } from "../courseTopic";

export interface IEnrollState {
    id?: string;
    _id?: string;
    course: string;
    user: string;
    currentTopic: string | ICourseTopic;
    finishedTopics: string[];
    createdAt?: Date;
    updatedAt?: Date;
    _v?: number;
};