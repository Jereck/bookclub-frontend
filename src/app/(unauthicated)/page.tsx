import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Star,
  BookMarked,
  Library,
  Calendar,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-40 bg-background flex justify-center">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BookClub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-16 pb-20 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex mb-2">Join the reading revolution</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Connect, Read, Discuss with BookClub
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Your personal reading companion that connects you with fellow book lovers. Track your reads, join
                    discussions, and discover your next favorite book.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup" className="flex items-center gap-1">
                      Get Started <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-primary/20 rounded-3xl blur-3xl" />
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 w-[200px] h-[280px] bg-background border shadow-lg rounded-lg rotate-[-6deg] z-10">
                      <div className="p-3 h-full flex flex-col">
                        <div className="w-full h-[140px] bg-muted rounded-md mb-3 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-3/4 bg-muted rounded-full" />
                          <div className="h-3 w-1/2 bg-muted rounded-full" />
                          <div className="flex mt-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-12 right-6 w-[220px] h-[300px] bg-background border shadow-lg rounded-lg rotate-[4deg] z-20">
                      <div className="p-3 h-full flex flex-col">
                        <div className="w-full h-[160px] bg-muted rounded-md mb-3 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-3/4 bg-muted rounded-full" />
                          <div className="h-3 w-1/2 bg-muted rounded-full" />
                          <div className="flex mt-2">
                            {[1, 2, 3, 4].map((i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            ))}
                            <Star className="h-4 w-4 text-muted" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-24 left-20 w-[240px] h-[320px] bg-background border shadow-lg rounded-lg z-30">
                      <div className="p-3 h-full flex flex-col">
                        <div className="w-full h-[180px] bg-muted rounded-md mb-3 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-3/4 bg-muted rounded-full" />
                          <div className="h-3 w-1/2 bg-muted rounded-full" />
                          <div className="flex mt-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i <= 3 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              Currently Reading
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything you need for your reading journey
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  BookClub combines personal library management with social reading experiences
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <FeatureCard
                icon={<Library className="h-10 w-10 text-primary" />}
                title="Personal Library"
                description="Track your books, reading progress, and ratings in one place"
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Book Clubs"
                description="Create or join book clubs with friends, family, or new connections"
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Discussions"
                description="Engage in meaningful conversations about your favorite books"
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Reading Schedule"
                description="Set reading goals and track your progress over time"
              />
              <FeatureCard
                icon={<BookMarked className="h-10 w-10 text-primary" />}
                title="Recommendations"
                description="Discover new books based on your reading history and preferences"
              />
              <FeatureCard
                icon={<TrendingUp className="h-10 w-10 text-primary" />}
                title="Reading Stats"
                description="Visualize your reading habits with detailed statistics"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/30 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2">How It Works</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple steps to get started
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Begin your reading journey with BookClub in just a few easy steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <StepCard
                number="1"
                title="Create your account"
                description="Sign up and set up your reading profile with your preferences"
              />
              <StepCard
                number="2"
                title="Build your library"
                description="Add books you've read or want to read to your personal collection"
              />
              <StepCard
                number="3"
                title="Join the community"
                description="Connect with other readers and join book discussions"
              />
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="py-16 md:py-24 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="mb-2">App Preview</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your personal reading dashboard</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Track your reading progress, manage your book clubs, and discover new books all in one place.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Intuitive book tracking system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Seamless book club management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Personalized reading recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Detailed reading statistics and insights</span>
                  </li>
                </ul>
                <div>
                  <Button size="lg" asChild>
                    <Link href="/signup">Try it for free</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <Tabs defaultValue="overview" className="w-full max-w-[600px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="library">Library</TabsTrigger>
                    <TabsTrigger value="club">Book Club</TabsTrigger>
                  </TabsList>
                  <div className="mt-4 rounded-lg border bg-card p-2">
                    <TabsContent value="overview" className="mt-0">
                      <Card>
                        <CardContent className="p-0">
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            width={600}
                            height={400}
                            alt="Dashboard overview"
                            className="rounded-md object-cover"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="library" className="mt-0">
                      <Card>
                        <CardContent className="p-0">
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            width={600}
                            height={400}
                            alt="Library view"
                            className="rounded-md object-cover"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="club" className="mt-0">
                      <Card>
                        <CardContent className="p-0">
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            width={600}
                            height={400}
                            alt="Book club view"
                            className="rounded-md object-cover"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-muted/30 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2">Testimonials</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What our readers say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Join thousands of readers who have transformed their reading experience with BookClub
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              <TestimonialCard
                quote="BookClub has completely changed how I read. I've connected with so many like-minded readers and discovered amazing books I would have never found otherwise."
                author="Sarah J."
                role="Book Club Leader"
              />
              <TestimonialCard
                quote="As someone who struggles to finish books, the reading goals and community accountability have helped me read more than ever before."
                author="Michael T."
                role="Casual Reader"
              />
              <TestimonialCard
                quote="I love how easy it is to track my reading progress and share thoughts with my book club. The interface is intuitive and the recommendations are spot on!"
                author="Emma R."
                role="Avid Reader"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2">FAQ</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently asked questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Everything you need to know about BookClub
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 mt-12">
              <FaqItem
                question="Is BookClub free to use?"
                answer="Yes, BookClub offers a free tier with all essential features. We also offer a premium subscription with advanced features for more dedicated readers."
              />
              <FaqItem
                question="How do I create a book club?"
                answer="After signing up, you can create a book club from your dashboard. You can set it as public or private, invite members, and start adding books to your reading list."
              />
              <FaqItem
                question="Can I import my books from other platforms?"
                answer="Yes, BookClub supports importing your library from Goodreads, StoryGraph, and other popular reading platforms to make your transition seamless."
              />
              <FaqItem
                question="How many book clubs can I join?"
                answer="You can join up to 5 book clubs with a free account, and unlimited book clubs with a premium subscription."
              />
              <FaqItem
                question="Is there a mobile app available?"
                answer="Yes, BookClub is available as a web app and has native mobile apps for iOS and Android for reading on the go."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/10 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to start your reading journey?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Join thousands of readers who have transformed their reading experience with BookClub
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">Sign up for free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0 flex justify-center">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">© 2025 BookClub. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="flex flex-col items-center text-center p-6 space-y-2 h-full">
      <div className="p-2 bg-primary/10 rounded-full mb-2">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
        {number}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="flex flex-col justify-between p-6 h-full">
      <div>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        <p className="italic mb-4">{quote}</p>
      </div>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </Card>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}

