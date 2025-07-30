import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { wasteDetectionService, type WasteDetectionResult } from "@/services/wasteDetection";

// Using the interface from the service
type AnalysisResult = WasteDetectionResult;

const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Real TensorFlow-based waste analysis
  const analyzeWasteWithTensorFlow = async (file: File): Promise<AnalysisResult> => {
    try {
      const imageElement = await wasteDetectionService.createImageElement(file);
      return await wasteDetectionService.detectWaste(imageElement);
    } catch (error) {
      console.error('TensorFlow analysis failed:', error);
      throw error;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Store both the file and its data URL
    setUploadedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image Uploaded",
      description: "Ready to analyze waste type"
    });
  };

  const analyzeImage = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    
    try {
      toast({
        title: "Loading AI Model",
        description: "Initializing TensorFlow.js model for analysis..."
      });

      const result = await analyzeWasteWithTensorFlow(uploadedFile);
      setAnalysisResult(result);

      toast({
        title: "Analysis Complete",
        description: `Detected ${result.category} waste with ${Math.round(result.confidence * 100)}% confidence`
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wet": return "bg-green-100 text-green-800";
      case "dry": return "bg-blue-100 text-blue-800";
      case "hazardous": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "wet": return "💧";
      case "dry": return "🗑️";
      case "hazardous": return "⚠️";
      default: return "❓";
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Waste Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image of waste items and our TensorFlow.js-powered AI will help you identify the correct waste category.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <Badge variant="secondary" className="mr-2">TensorFlow.js</Badge>
            Real AI-powered waste classification
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  uploadedImage ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded waste" 
                      className="max-w-full h-48 object-contain mx-auto rounded-lg"
                    />
                    <div className="flex gap-2 justify-center">
                      <Button 
                        onClick={analyzeImage} 
                        disabled={isAnalyzing}
                        className="flex items-center gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Camera className="w-4 h-4" />
                            Analyze Waste
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={resetUpload}
                        disabled={isAnalyzing}
                      >
                        Upload New
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Upload Waste Image</h3>
                      <p className="text-muted-foreground mb-4">
                        Take a photo or upload an image of waste items
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Choose File
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Supported formats: JPEG, PNG, GIF (max 5MB)
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analyzing Image...</h3>
                  <p className="text-muted-foreground text-center">
                    Our AI is examining the waste items in your image
                  </p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-6">
                  {/* Category Result */}
                  <div className="text-center p-6 rounded-lg bg-muted/30">
                    <div className="text-4xl mb-3">
                      {getCategoryIcon(analysisResult.category)}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {analysisResult.category.charAt(0).toUpperCase() + analysisResult.category.slice(1)} Waste
                    </h3>
                    <Badge className={getCategoryColor(analysisResult.category)}>
                      {Math.round(analysisResult.confidence * 100)}% Confidence
                    </Badge>
                  </div>

                  {/* Detected Items */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Detected Items:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.items.map((item, index) => (
                        <Badge key={index} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold mb-3">Recommendations:</h4>
                    <ul className="space-y-2">
                      {analysisResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground">
                    Upload an image to get started with waste detection
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-12 border-border">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📸</span>
                </div>
                <h3 className="font-semibold mb-2">1. Upload Image</h3>
                <p className="text-sm text-muted-foreground">
                  Take a clear photo of your waste items or upload from your device
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="font-semibold mb-2">2. TensorFlow Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  TensorFlow.js analyzes the image using machine learning to identify waste types
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">✅</span>
                </div>
                <h3 className="font-semibold mb-2">3. Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  Receive categorization and disposal recommendations for proper waste management
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageUpload;