import Form from "./Form";

interface Props {
  params: {
    id: string;
  };
}

const PostEdit = async ({ params }: Props) => {
  return (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl font-semibold">Edit Post</h3>
      <Form id={params.id} />
    </div>
  );
};

export default PostEdit;
