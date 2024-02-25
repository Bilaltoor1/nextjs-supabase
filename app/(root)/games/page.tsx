import React, {Suspense} from 'react';
import GameFilter from "@/components/Games/GameFilter";
import GameSearchBar from "@/components/Games/GameSearch";
import GameCardsContainer from "@/components/Games/GameCardsContainer";
import {getGamesAndApps} from "@/lib/actions/CreateGamesApps.action";
import Pagination from "@/components/pagination/pagination";
import LoadingSuspense from "@/app/(root)/games/loadingSuspense";

async function Page({searchParams}: { searchParams: any }) {
    const {GamesAndApps, isNext} = await getGamesAndApps({
        filter: searchParams.filter,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize: searchParams.pageSize ? +searchParams.pageSize : 9,
    })

    return (
        <div>
            <GameSearchBar route="/games"
                           iconPosition="left"
                           imgSrc="/assets/icons/search.svg"
                           placeholder="Search for any game and apps"
                           otherClasses=" mb-8 w-[300px] max-md:w-[350px] m-auto"/>
            <GameFilter/>
            <Suspense  fallback={<LoadingSuspense/>}>
                <GameCardsContainer GamesAndApps={GamesAndApps}/>
            </Suspense>
            <Pagination pageNumber={
                searchParams && searchParams.page
                    ? +searchParams.page
                    : 1
            } isNext={isNext}/>
        </div>
    );
}

export default Page;