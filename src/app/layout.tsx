import './globals.css'
import Content from './layout/Content'
import Header from './layout/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head />
        <body className="bg-primary text-primary">
            <main>
                <Header />
                <div className="container m-auto">
                    <Content>
                        {children}
                    </Content>
                </div>
            </main>
        </body>
    </html>
  )
}
