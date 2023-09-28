import { GetStaticPropsContext } from 'next/types';
import { createTranslator } from 'next-intl';
import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List } from 'react-virtualized';

import { useGetAllPostsQuery } from '@/api/api';
import { getLayoutWithSidebar } from '@/components/Layout/WithSidebarLayout/WithSidebarLayout';
import Post from '@/components/Post/Post';
import { PostType } from '@/components/Post/types';

import s from './styles.module.scss';

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('myProfile.pageTitle')
        }
    };
}

const Home = () => {
    const [page, setPage] = useState(1);
    const { data: postsData, isLoading } = useGetAllPostsQuery(page, { refetchOnMountOrArgChange: true });
    const countPhotos = postsData?.items.reduce((acc, cur) => {
        return acc + cur.image.length;
    }, 0);

    const fetchNextPage = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);

    return (
        <div className={s.container}>
            <List
                width={600}
                height={600}
                rowHeight={400}
                rowCount={postsData?.items.length as number}
                rowRenderer={({ key, index, style, parent }) => {
                    const post = postsData?.items[index];
                    return (
                        <div key={key} style={style}>
                            {post?.image}
                            {/*<Post key={post?.id} post={post as PostType} />*/}
                        </div>
                    );
                }}
            />
            {/*<InfiniteScroll*/}
            {/*    next={fetchNextPage}*/}
            {/*    hasMore={true}*/}
            {/*    loader={isLoading}*/}
            {/*    dataLength={countPhotos ?? 0}*/}
            {/*    scrollThreshold={0.9}>*/}
            {/*   */}
            {/*    /!*<div className={s.feed}>{postsData?.items.map(post => <Post key={post.id} post={post} />)}</div>*!/*/}
            {/*</InfiniteScroll>*/}
        </div>
    );
};

Home.getLayout = getLayoutWithSidebar;
export default Home;
