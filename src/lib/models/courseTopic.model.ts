import { topicTypes } from "@/constants/courseTopics";
import { ICourseTopic, ICourseTopicModel } from "@/types/courseTopic";
import { Schema, model, models } from "mongoose";

const CourseTopicSchema = new Schema<ICourseTopic, ICourseTopicModel>(
  {
    topicID: {
      type: Number,
      required: [true, "Topic ID is required"],
    },
    type: {
      type: String,
      enum: topicTypes,
      default: "content-from-internet",
    },
    views: {
      type: Number,
      default: 0,
    },
    versions: [
      {
        title: {
          type: String,
          required: [true, "Title is required"],
        },
        description: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          required: [true, "Link is required"],
        },
        source: {
          type: String,
          default: "",
        },
        duration: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const CourseTopic =
  models.CourseTopic ||
  model<ICourseTopic, ICourseTopicModel>("CourseTopic", CourseTopicSchema);

export default CourseTopic;
