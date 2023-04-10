import { Button } from "@material-tailwind/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import client from "~/axios.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: ENV.APP_TITLE }];
};

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const loader: LoaderFunction = async () => {
  const res = await client("/photos?_limit=14");

  return json({
    photos: res.data,
  });
};

export default function Index() {
  const { photos } = useLoaderData();

  return (
    <div className="container mx-auto text-center py-4">
      <h1 className="text-xl font-bold">Welcome to Remix</h1>
      <a
        target="_blank"
        href="https://www.material-tailwind.com/docs/react/guide/remix"
        rel="noreferrer"
      >
        <Button color="light-green" variant="gradient" className="my-4">
          Tailwind Material UI
        </Button>
      </a>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {photos.map((photo: Photo) => (
          <img
            key={photo.id}
            src={photo.thumbnailUrl}
            alt="thumbnail"
            className="object-cover w-40 h-40"
          />
        ))}
      </div>
    </div>
  );
}
