"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Workflow, Zap, Download, Palette, ArrowRight, Check, Twitter, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs";
export default function LandingPage() {
  const user = useUser()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header/Navbar */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Workflow className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">FlowAI</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href={`${!user.isSignedIn}`?"/sign-up" : "dg"}>
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Sign In
              </Button>
              </Link>
              <Link href={`${!user.isSignedIn}`?"/sign-up" : "dg"}>
              <Button className="bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Visualize Workflows with AI
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Generate beautiful, intelligent workflow diagrams instantly from simple text prompts.
            </p>
            <Link href={`${!user.isSignedIn}` ? "/sign-up" : "dg"}>
            <Button
              size="lg"
              className="bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold text-lg px-8 py-4 mb-12"
            >
              Start for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
                <div className="bg-white rounded-xl p-6 min-h-[400px] flex items-center justify-center">
                  <div className="w-full max-w-2xl">
                    {/* Mock workflow diagram */}
                    <div className="space-y-6">
                      {/* Start node */}
                      <div className="flex justify-center">
                        <div className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                          Start Process
                        </div>
                      </div>

                      {/* Arrow down */}
                      <div className="flex justify-center">
                        <div className="w-0.5 h-8 bg-gray-400"></div>
                      </div>

                      {/* Decision node */}
                      <div className="flex justify-center">
                        <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform rotate-45 w-32 h-32 flex items-center justify-center">
                          <span className="transform -rotate-45 text-sm">Decision Point</span>
                        </div>
                      </div>

                      {/* Branches */}
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
                            Process A
                          </div>
                          <div className="w-0.5 h-6 bg-gray-400"></div>
                          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
                            Task 1
                          </div>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
                            Process B
                          </div>
                          <div className="w-0.5 h-6 bg-gray-400"></div>
                          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
                            Task 2
                          </div>
                        </div>
                      </div>

                      {/* Converge */}
                      <div className="flex justify-center">
                        <div className="w-0.5 h-8 bg-gray-400"></div>
                      </div>

                      {/* End node */}
                      <div className="flex justify-center">
                        <div className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                          End Process
                        </div>
                      </div>
                    </div>

                    {/* AI badge */}
                    <div className="absolute top-4 right-4 bg-blue-400 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>AI Generated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to create professional workflow diagrams without any design experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-400/10 rounded-full w-fit">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl">AI-Powered Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center">
                  Simply describe your workflow in plain English and watch as our AI creates a professional diagram in
                  seconds.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-400/10 rounded-full w-fit">
                  <Download className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl">Instant PDF/PNG Export</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center">
                  Export your diagrams in high-quality PDF or PNG formats, ready for presentations, documentation, or
                  sharing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-400/10 rounded-full w-fit">
                  <Palette className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl">No Design Skills Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center">
                  Focus on your ideas, not design. Our AI handles layout, styling, and visual hierarchy automatically.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Create professional workflow diagrams in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mx-auto mb-6 p-4 bg-blue-400/10 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Enter Your Prompt</h3>
              <p className="text-slate-300">
                Describe your workflow process in natural language. Be as detailed or as simple as you like.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 p-4 bg-blue-400/10 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Generate Diagram</h3>
              <p className="text-slate-300">
                Our AI analyzes your description and creates a beautiful, structured workflow diagram instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 p-4 bg-blue-400/10 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Export & Use</h3>
              <p className="text-slate-300">
                Download your diagram as PDF or PNG, or continue editing and refining with additional prompts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-white mb-2">Free</CardTitle>
                <div className="text-4xl font-bold text-white mb-4">
                  $0<span className="text-lg text-slate-400">/month</span>
                </div>
                <CardDescription className="text-slate-300">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-300">5 diagrams per month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-300">Basic templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-300">PNG export</span>
                </div>
                <Button className="w-full mt-6 bg-slate-700 hover:bg-slate-600 text-white">Get Started Free</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-400/10 to-purple-400/10 border-blue-400/50 backdrop-blur-sm relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-400 text-slate-900">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-white mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold text-white mb-4">
                  $19<span className="text-lg text-slate-400">/month</span>
                </div>
                <CardDescription className="text-slate-300">For professionals and teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-300">Unlimited diagrams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-300">Premium templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-300">PDF & PNG export</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-300">Priority support</span>
                </div>
                <Button className="w-full mt-6 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Workflow className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">FlowAI</span>
              </div>
              <p className="text-slate-400 text-sm">Generate beautiful workflow diagrams with the power of AI.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Features
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Templates
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  API
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Documentation
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} FlowAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
