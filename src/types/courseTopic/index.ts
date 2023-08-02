export interface ICourseTopic {
    id?: number | string;
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