import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { client } from "src/libs/client";

export type Blog = {
  title: string;
  body: string;
};

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  return (
    <div>
      <p className="text-gray-400">{`記事の総数: ${props.totalCount}件`}</p>
      <ul className="mt-4 space-y-4">
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-xl text-blue-800 underline hover:text-blue-400">
                  {content.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Blog>
> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });

  return {
    props: data,
  };
};

export default Home;
