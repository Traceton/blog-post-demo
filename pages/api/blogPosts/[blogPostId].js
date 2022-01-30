
  import BlogPost from "../../../components/models/BlogPost";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const blogPostId = req.query.blogPostId;

  switch (req.method) {
    case "GET":
      try {
        const blogPost = await BlogPost.findById(blogPostId);

        if (!blogPost) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "blogPost not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "blogPost found",
          blogPost: blogPost,
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "blogPost not found",
          error: error,
        });
      }
      break;
    case "PATCH":
      try {
        const blogPost = await BlogPost.findByIdAndUpdate(blogPostId, req.body, {
          new: true,
          runValidators: true,
        });

        if (!blogPost) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "blogPost not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "blogPost updated",
          blogPost: blogPost,
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "blogPost not updated",
          error: error,
        });
      }
      break;
    case "DELETE":
      try {
        const blogPost = await BlogPost.deleteOne({ _id: blogPostId });

        if (!blogPost) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "blogPost not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "blogPost deleted",
          blogPost: blogPost,
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "blogPost not deleted",
          error: error,
        });
      }
      break;
    default:
      res.status(404).json({
        message_type: "error",
        message: "Response method not found",
      });
      break;
  }
};

  