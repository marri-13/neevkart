import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    footerAddress: {
      type: String,
      default: "",
    },
    footerPhone: {
      type: String,
      default: "",
    },
    footerEmail: {
      type: String,
      default: "",
    },
    instagramUrl: {
      type: String,
      default: "",
    },
    facebookUrl: {
      type: String,
      default: "",
    },
    twitterUrl: {
      type: String,
      default: "",
    },
    paymentMethods: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
