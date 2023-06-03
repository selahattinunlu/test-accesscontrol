import Form from "./Form";

// this is also a server side component and we could use server actions here
// without sending API request. But that feature is not production ready yet.
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
// since it might be changed in the future, it might be dangerous to use it in production for now.
// so we'll use API for now.

const PostsList = async () => {
  return (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl font-semibold">Yeni Yazı</h3>
      <Form />
    </div>
  );
};

export default PostsList;
