
import BlogPost from "../../../components/models/BlogPost";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const blogPosts = await BlogPost.find({});

        if (!blogPosts) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "blogPosts not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "blogPosts found",
          blogPosts: blogPosts,
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "blogPosts not found",
          error: error,
        });
      }
      break;
    case "POST":
      try {
        const blogPost = await BlogPost.create(req.body);

        res.status(201).json({
          message_type: "success",
          message: "blogPost created",
          blogPost: blogPost,
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "blogPost not created",
          error: error,
        });
      }
      break;
    default:
      res.status(500).json({
        message_type: "error",
        message: "Response method not found",
      });
      break;
  }
};
  