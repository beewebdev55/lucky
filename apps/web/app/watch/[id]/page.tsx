import { redirect } from "next/navigation";
import { determineMediaType } from "@/lib/server/actions";

export default async function Watch(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  const mediaType = await determineMediaType(id);

  if (mediaType === "movie") {
    redirect(`/peliculas/${id}`);
  } else if (mediaType === "tv") {
    redirect(`/series/${id}`);
  } else {
    redirect("/");
  }
}
