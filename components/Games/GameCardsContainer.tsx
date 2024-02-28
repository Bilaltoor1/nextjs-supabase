import React from 'react';
import Image from "next/image";
import {Badge} from "@/components/ui/badge"
import moment from "moment/moment";
import Link from "next/link";

async function GameCardsContainer({GamesAndApps}: { GamesAndApps: any }) {
    function truncateTitle(title: string, maxLength: number = 30): string {
        if (title.length <= maxLength) {
          return title;
        }
        return `${title.substring(0, maxLength)}...`;
      }
    return (
        <div
            className=" h-full w-full flex flex-wrap  gap-6 mt-8 max-md:justify-center max-md:items-center">
            {
                GamesAndApps.map((game: any, index: number) => {
                    return (
                        <Link href={`/games/${game.slug}`} key={index}>
                            <div
                                className='flex border border-slate-300 dark:border-gray-500 sm:w-[400px] xss:w-[350px] w-[300px] rounded-lg'>
                                <div className='w-[100px] h-[100px] rounded-lg relative'>
                                    <Image src={game.thumbnail} alt='img' width={100} height={100}
                                           className='rounded-lg w-full min-h-[100px] min-w-[100px] h-full  overflow-hidden'/>
                                </div>
                                <div className='flex flex-col pl-3'>
                                    <h3 className='font-bold text-dark300_light900'>{truncateTitle(game.name)}</h3>
                                    <p className="text-sm text-gray-500">{moment(game.created_at).fromNow()}</p>
                                    <div className='flex gap-3'>
                                        <Badge variant="outline" className='w-fit mt-1 px-2 bg-red-500'>{game.sub_category}</Badge>
                                        <Badge variant="outline" className='w-fit mt-1 px-2 bg-green-500'>{game.category}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default GameCardsContainer;