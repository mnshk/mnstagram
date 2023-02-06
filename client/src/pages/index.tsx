import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import store from '../store'
import { getCurrentUserToken, getCurrentUserData, hydrateUserSlice, loggedOut } from '../store/user'
import { useDispatch, useSelector } from 'react-redux'
import isAuth from '../utils/isAuth'
import Image from 'next/image'

import SplashScreen from '@/components/SplashScreen'

import { RiMessengerLine, RiHome5Line } from 'react-icons/ri'
import { CgHome, CgSearch, CgBookmark } from 'react-icons/cg'
import { GrHomeRounded } from 'react-icons/gr'
import { BiBookmark } from 'react-icons/bi'
import { MdAccountCircle, MdOutlineExplore, MdAddCircleOutline } from 'react-icons/md'
import { AiOutlineHeart, AiFillHome, AiFillHeart } from 'react-icons/ai'
import { TbSend } from 'react-icons/tb'
import { FiMoreVertical } from 'react-icons/fi'

export default function Page() {

	const [view, setView] = useState<JSX.Element>(<SplashScreen />)

	useEffect(() => {
		if (isAuth()) {
			store.dispatch(hydrateUserSlice())
			setView(<Home />)
		}
	}, [])

	return (
		<>
			{view}
		</>
	)

}

function Home() {

	const currentUserData = useSelector((state: ReturnType<typeof store.getState>) => getCurrentUserData(state))
	const dispatch = useDispatch()

	useEffect(() => { }, [])


	return (
		<>
			<Head>
				<title>Mnstagram</title>
				<meta name="description" content="Mnstagram" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className='flex flex-col flex-grow w-screen h-full max-h-screen font-inter'>

				<div className="flex items-center w-full p-3 pr-4">
					<div className='flex-grow'>
						<Image src='/assets/images/mnstagram-text-logo.webp' className='translate-y-1' alt='Mnstagram' width={130} height={51} />
					</div>
					<div className="text-3xl">
						<Link href='/chat'>
							<Image src='/assets/images/messenger.svg' alt='Messenger' width={24} height={24} onClick={() => dispatch(loggedOut())} />
						</Link>
					</div>
				</div>

				<div className="flex-grow pb-20 overflow-y-auto border-y">
					<div className="flex w-full p-2 overflow-x-auto border-b">
						<StoryCircle label='Your story' />
					</div>
					<FeedPost />
					<FeedPost />
				</div>


				<div className="flex items-center justify-around w-full p-2 text-3xl bg-white">
					<Link href='/'>
						<Image src='/assets/images/home.svg' alt='Home' width={24} height={24} />
					</Link>
					<Link href='/explore'>
						<Image src='/assets/images/explore.svg' alt='Explore' width={24} height={24} />
					</Link>
					<Link href='/explore'>
						<Image src='/assets/images/create.svg' alt='Create' width={24} height={24} />
					</Link>
					<Link href='/notifications'>
						<Image src='/assets/images/heart.svg' alt='Notifications' width={24} height={24} />
					</Link>
					{/* <Link href={`/${currentUserData.username}`}> */}
					<Link href={''}>
						<ProfileAvatar />
					</Link>
				</div>
			</div>
		</>
	)
}

const StoryCircle = ({ label }: { label: string }) => {
	return (
		<div className='flex flex-col items-center flex-grow-0 flex-shrink-0 w-auto p-2' style={{ maxWidth: '90px' }}>
			<Image src='/assets/images/default-profile.webp' className='object-cover' alt='Img' width={70} height={70} />
			<div className="w-full p-1 overflow-hidden text-xs text-ellipsis whitespace-nowrap">{label}</div>
		</div>
	)
}

const FeedPost = () => {
	return (
		<div className="w-full text-sm">
			<div className='flex items-center p-3'>
				<ProfileAvatar />
				<div className='px-3'>
					<div className='text-xs font-bold'>test_account</div>
					<div className='text-xs'>Earth</div>
				</div>
				<div className="flex-grow"></div>
				<div className='text-lg'>
					<FiMoreVertical />
				</div>
			</div>
			<Image src='/assets/images/post.jpg' width='720' height='720' alt='post'></Image>
			<div className='p-2'>
				<div className="flex gap-4 py-3 text-3xl">
					<Image src='/assets/images/heart.svg' alt='Icon' width={24} height={24} />
					<Image src='/assets/images/comment.svg' alt='Icon' width={24} height={24} />
					<Image src='/assets/images/share.svg' alt='Icon' width={24} height={24} />
					<div className="flex-grow"></div>
					<Image src='/assets/images/bookmark.svg' alt='Icon' width={24} height={24} />
				</div>
				<div>3 Likes</div>
				<div>
					<div className=''>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus facilis molestiae expedita architecto nihil reiciendis reprehenderit deserunt sequi aut aperiam. Maxime unde, in aliquid vel autem iste vero placeat harum.
					</div>
					{/* <div className='text-gray-500'>... more</div> */}
				</div>
				<div className='py-1 text-gray-500'>View all 63 comments</div>
			</div>
		</div>
	)
}

const ProfileAvatar = () => {
	return (
		<div className='overflow-hidden rounded-full'>
			<Image src='/assets/images/default-profile.webp' alt='Icon' width={24} height={24}></Image>
		</div>
	)
}