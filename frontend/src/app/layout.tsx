import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import { Box } from '@/components/Box/Box';
import { Flex } from '@/components/Flex/Flex';

import logo from '@/assets/logo.png';

import '@/styles/_root.scss';
import '@/styles/_var.scss';
import '@/styles/_reset.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'KaraFine',
    description: 'Generated to sing on Youtube easier',
}

const RootLayout = ({ children }: { children: React.ReactNode }) =>
{
    return (
        <html lang="en">
            <body className={inter.className}>
                <Flex sx={{ h: 'full', w: 'full', bgColor: 'bg' }}>
                    <Box sx={{ w: 60, p: 2, bgColor: 'fadedLight' }}>
                        <Flex justify='center' items='center' gap={2}>
                            <Image alt='' src={logo} width={28} height={28} />
                            <h1>KaraFine</h1>
                        </Flex>
                    </Box>
                </Flex>
                {children}
            </body>
        </html>
    )
}

export default RootLayout
