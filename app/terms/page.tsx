import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        Terms of Service
      </h1>

      <div className="prose prose-invert prose-purple max-w-none">
        <p className="text-sm text-gray-400">Last updated: April 19, 2025</p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using SpaceExplorer ("the Website"), you agree to be bound by these Terms of Service and all
          applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
          accessing this site.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily access the materials on SpaceExplorer for personal, non-commercial use
          only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to decompile or reverse engineer any software contained on SpaceExplorer</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by
          SpaceExplorer at any time.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide information that is accurate, complete, and current at
          all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
          your account.
        </p>
        <p>
          You are responsible for safeguarding the password that you use to access the Website and for any activities or
          actions under your password. You agree not to disclose your password to any third party. You must notify us
          immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </p>

        <h2>4. User Contributions</h2>
        <p>
          The Website may contain message boards, forums, bulletin boards, and other interactive features that allow
          users to post, submit, publish, display, or transmit content or materials. By providing any User Contribution,
          you grant us the right to use, reproduce, modify, adapt, publish, translate, distribute, and display such
          material.
        </p>
        <p>You represent and warrant that:</p>
        <ul>
          <li>You own or control all rights to the User Contributions</li>
          <li>All User Contributions comply with these Terms of Service</li>
          <li>User Contributions do not violate the rights of any third party</li>
        </ul>

        <h2>5. Accuracy of Materials</h2>
        <p>
          The materials appearing on SpaceExplorer could include technical, typographical, or photographic errors.
          SpaceExplorer does not warrant that any of the materials on its website are accurate, complete, or current.
          SpaceExplorer may make changes to the materials contained on its website at any time without notice.
        </p>

        <h2>6. Links</h2>
        <p>
          SpaceExplorer has not reviewed all of the sites linked to its website and is not responsible for the contents
          of any such linked site. The inclusion of any link does not imply endorsement by SpaceExplorer of the site.
          Use of any such linked website is at the user's own risk.
        </p>

        <h2>7. Modifications</h2>
        <p>
          SpaceExplorer may revise these Terms of Service at any time without notice. By using this website, you are
          agreeing to be bound by the then current version of these Terms of Service.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law
          provisions.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason
          whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2>10. Disclaimer</h2>
        <p>
          The materials on SpaceExplorer are provided on an 'as is' basis. SpaceExplorer makes no warranties, expressed
          or implied, and hereby disclaims and negates all other warranties including, without limitation, implied
          warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
          intellectual property or other violation of rights.
        </p>

        <h2>11. Limitations</h2>
        <p>
          In no event shall SpaceExplorer or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on SpaceExplorer, even if SpaceExplorer or a SpaceExplorer authorized representative has
          been notified orally or in writing of the possibility of such damage.
        </p>

        <h2>12. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>
          <a href="mailto:terms@spaceexplorer.com" className="text-purple-400 hover:text-purple-300">
            terms@spaceexplorer.com
          </a>
        </p>
      </div>
    </div>
  )
}
