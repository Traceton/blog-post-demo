
  import Link from 'next/link'
import { useRouter } from "next/router";

export default function BlogPostDetails(props) {
  // router object from next
  const router = useRouter();

  const blogPost = props.blogPost

  return (
    <div className="bg-gray-700 h-screen">
      <div className="p-2">
        <div className=" m-4 p-4 rounded-md bg-gray-400 font-light space-y-8 ">
          <form >
            <div>
              <h3 className="text-4xl leading-6 font-light text-gray-900">Show BlogPost</h3>
            </div>

            <div className="text-xl mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6"><label htmlFor="title" className="block text-3xl font-light text-gray-700">title</label><div className="mt-1 flex rounded-md shadow-sm"><h1 id="year">{props.blogPost.title}</h1></div></div><div className="sm:col-span-6"><label htmlFor="description" className="block text-3xl font-light text-gray-700">description</label><div className="mt-1 flex rounded-md shadow-sm"><h1 id="year">{props.blogPost.description}</h1></div></div>
              <div className="m-2 p-2 w-full">
                <div className="  flex justify-start">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <Link href={"/blogPosts/editBlogPosts/" + blogPost._id}>
                    <a className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                      Edit
                    </a>
                  </Link>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export const getServerSideProps = async (context) => {
  // fetch blogPost data from api here
  const blogPostId = context.params.blogPostId;
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/blogPosts/${blogPostId}`, {
    method: "GET"
  });

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blogPost: data.blogPost,
    },
  };
};
  