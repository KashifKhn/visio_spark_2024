import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Globe, Shield, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">ISP Manager</div>
          <div className="space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            <Link href="/admin">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Streamline Your ISP Operations</h1>
          <p className="text-xl text-gray-600 mb-8">Efficient customer management, service tracking, and subscription handling all in one place.</p>
          <Link href="/admin">
            <Button size="lg" className="text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Globe className="h-10 w-10 text-blue-500" />}
            title="Customer Management"
            description="Easily manage customer profiles, track service requests, and handle subscriptions."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-blue-500" />}
            title="Service Tracking"
            description="Monitor and respond to service requests quickly and efficiently."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-blue-500" />}
            title="Secure & Reliable"
            description="Built with security in mind to protect your customers' data."
          />
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose ISP Manager?</h2>
          <ul className="space-y-4">
            <BenefitItem text="Centralized customer information for quick access and updates" />
            <BenefitItem text="Automated subscription management to reduce errors" />
            <BenefitItem text="Detailed reporting and analytics for informed decision-making" />
            <BenefitItem text="Scalable solution that grows with your business" />
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your ISP Operations?</h2>
          <p className="text-xl text-gray-600 mb-8">Join the many ISPs already benefiting from our management system.</p>
          <Link href="/admin">
            <Button size="lg" className="text-lg">
              Access Admin Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">© 2023 ISP Manager. All rights reserved.</div>
            <div className="space-x-4">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center">
      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
      <span>{text}</span>
    </li>
  )
}

