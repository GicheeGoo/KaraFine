import type { Metadata } from 'next'
import Image from 'next/image';
import { Inter } from 'next/font/google'

import '../styles/_root.scss';
import '../styles/_var.scss';
import '../styles/_reset.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'KaraFine',
    description: 'Generated to sing on Youtube easier',
}

const RootLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className='h-full w-full bg'>
                    <div className='flex h-full'>
                        <div className='flex justify-center w-60 p-2 faded-light'>
                            <Image alt='' src='/assets/logo.png' width={20} height={20} />
                            <h1>KaraFine</h1>
                        </div>
                    </div>
                </div>
                {children}
            </body>
        </html>
    )
}

export default RootLayout
