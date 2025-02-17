"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Mermaid from "./Mermaid"
import { Bot, Send, Sparkles, Workflow, Zap } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import html2canvas from 'html2canvas'; // For converting the diagram to a canvas
import { jsPDF } from 'jspdf'; // For generating PDFs from the canvas
import { Download } from 'lucide-react';
import mermaid from "mermaid"

export default function DiagramGenerator() {
  const [prompt, setPrompt] = useState("")
  const [diagram, setDiagram] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const mermaidRef = useRef<HTMLDivElement | null>(null)


  const downloadPNG = () => {
    html2canvas(mermaidRef.current!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'diagram.png'; // Name of the file
      link.click();
    });
  };
  // Function to download as PDF
  const downloadPDF = () => {
    if (mermaidRef.current) {
      html2canvas(mermaidRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Get the width and height of the canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // PDF page size in mm (A4 size)
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 250; // A4 height in mm

        // Calculate the scale to maintain aspect ratio
        const scale = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);

        // Calculate scaled width and height
        const scaledWidth = canvasWidth * scale;
        const scaledHeight = canvasHeight * scale;

        // Create the PDF and add the image
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, scaledWidth, scaledHeight); // Adjusted width/height

        // Save the generated PDF
        pdf.save('diagram.pdf');
      });
    }
  };


  const generateDiagram = async () => {
    if (!prompt.trim()) {
      setError("Please enter a workflow description")
      return
    }

    setIsLoading(true)
    setError("")


    try {
      const response = await fetch('http://localhost:5000/generate-daigrams', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const text = data.response?.text

      if (typeof text === "string") {
        const cleanDiagram = text
          .replace(/```mermaid/g, "")
          .replace(/```/g, "")
          .trim()
        setDiagram(cleanDiagram)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to generate diagram")
      console.error("Error generating diagram:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Workflow className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">FlowAI</span>
          </div>
          {/* <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
          </div> */}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm">AI-Powered Workflow Generation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Transform Your <span className="text-blue-400">Workflow</span> with AI
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Create, optimize, and automate your workflows with our advanced AI technology.
            Save time and boost productivity with intelligent process generation.
          </p>

          {/* Workflow Generator Interface */}
          <div className="max-w-3xl mx-auto bg-slate-800/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mb-8">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your workflow (e.g., 'Create a customer onboarding process for a SaaS platform')"
                    className="w-full h-24 px-4 py-3 bg-slate-900/50 text-white rounded-xl border border-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                  />
                </div>
                <Button
                  className="self-end group bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-lg font-semibold flex items-center transition-all transform hover:scale-105 hover:shadow-lg"
                  onClick={generateDiagram}
                  disabled={isLoading}
                >
                  <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Pro tip: Be specific about your workflow requirements and desired outcomes
              </p>
            </div>

            {/* Workflow Display Area */}
            <div className={`rounded-xl p-8 min-h-[300px] border border-slate-700 ${diagram ? 'bg-white' : 'bg-slate-900/50'
              }`}>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                </div>
              ) : diagram ? (
                // <Mermaid chart={diagram} />
                <div className="text-slate-900" style={{}}>
                  <div style={{ position: 'absolute', right: '50px',  }} className="flex gap-4">
                    <Button
                      onClick={downloadPDF}
                      style={{borderRadius : 8}}
                      className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      <Download className="mr-2" size={20} />
                      Download PDF
                    </Button>
                    <Button
                      onClick={downloadPNG}
                      style={{borderRadius : 8}}
                      className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      <Download className="mr-2" size={20} />
                      Download PNG
                    </Button>
                  </div>
                  <div ref={mermaidRef}>
                    <Mermaid chart={diagram} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <p className="text-center">
                    Your generated workflow will appear here<br />
                    <span className="text-sm">Enter a prompt above to get started</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
