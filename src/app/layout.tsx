'use client'

import './globals.css'
import NextNProgress from "nextjs-progressbar";
import Content from './layout/Content'
import Header from './layout/Header'
import { AnimatePresence } from 'framer-motion';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head />
        <body className="bg-primary text-primary">
          <AnimatePresence mode="wait">
            <main className={`px-10`}>
                <NextNProgress height={6} color="#4338C9" />
                <Header />
                <div className="container m-auto flex h-[700px]">
                    <div className={`bg-[] rounded-xl w-20`}>
                      
                    </div>
                    <Content>
                        {children}
                    </Content>
                </div>
            </main>
          </AnimatePresence>
        </body>
    </html>
  )
}
