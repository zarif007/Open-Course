export interface ICourseTopic {
    id?: number | string;
    _id?: string;
    topicID?: number;
    versions: [
        {
            title: string;
            url: string;
            description?: string;
            duration: number;
        }
    ]
}