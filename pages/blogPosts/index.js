
    import Link from 'next/link'

    export default function BlogPost(props) {
      return (
        <div className="bg-gray-700 h-screen">
          <div className="p-2">
            <div className="m-4 p-4 rounded-md bg-gray-400 font-light space-y-8">
              <div className="flex flex-row">
                <div className="p-4 m-4">
                  <h3 className="text-4xl leading-6 font-light text-gray-900">BlogPosts</h3>
                </div>

                <div className="m-2 p-2 w-full justify-end">
                  <div className="pt-2 flex justify-end">
                    <Link href="/blogPosts/createBlogPost">
                      <a className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                        New
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {props.blogPosts.map((blogPost) => (
                  <div
                    key={blogPost._id}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <div className="flex-1 min-w-0">
                      <a href={"/blogPosts/" + blogPost._id} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-lg text-gray-500 truncate">title: {blogPost.title}</p> <p className="text-lg text-gray-500 truncate">description: {blogPost.description}</p> 
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    export const getServerSideProps = async () => {
      // fetch blogPost data from api here
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/blogPosts`, {
        method: "GET",
        headers: {
          "User-Agent": "*",
          Accept: "application/json; charset=UTF-8",
        }
      });

      const data = await res.json();

      if (!data) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          blogPosts: data.blogPosts,
        },
      };
    };
  