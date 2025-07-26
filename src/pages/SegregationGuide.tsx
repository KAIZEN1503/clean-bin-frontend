import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Droplets, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SegregationGuide = () => {
  const [showDryWaste, setShowDryWaste] = useState(true);
  const [showWetWaste, setShowWetWaste] = useState(true);

  const dryWasteItems = [
    { name: "Plastic Bottles", category: "Recyclable", color: "blue" },
    { name: "Paper & Cardboard", category: "Recyclable", color: "blue" },
    { name: "Metal Cans", category: "Recyclable", color: "blue" },
    { name: "Glass Containers", category: "Recyclable", color: "blue" },
    { name: "Electronics", category: "E-Waste", color: "purple" },
    { name: "Batteries", category: "Hazardous", color: "red" },
    { name: "Fabric & Textiles", category: "Recyclable", color: "blue" },
    { name: "Rubber Items", category: "Special", color: "orange" },
  ];

  const wetWasteItems = [
    { name: "Fruit Peels", category: "Compostable", color: "green" },
    { name: "Vegetable Scraps", category: "Compostable", color: "green" },
    { name: "Food Leftovers", category: "Compostable", color: "green" },
    { name: "Coffee Grounds", category: "Compostable", color: "green" },
    { name: "Tea Bags", category: "Compostable", color: "green" },
    { name: "Eggshells", category: "Compostable", color: "green" },
    { name: "Garden Waste", category: "Compostable", color: "green" },
    { name: "Dairy Products", category: "Organic", color: "yellow" },
  ];

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "green": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "purple": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "red": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "orange": return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "yellow": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Waste Segregation Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to properly categorize different types of waste for effective recycling and environmental protection.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={() => setShowDryWaste(!showDryWaste)}
            variant={showDryWaste ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Dry Waste Examples
            {showDryWaste ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => setShowWetWaste(!showWetWaste)}
            variant={showWetWaste ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Droplets className="w-4 h-4" />
            Wet Waste Examples
            {showWetWaste ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dry Waste Section */}
          <Card className={cn(
            "transition-all duration-500 border-border",
            showDryWaste ? "opacity-100 transform-none" : "opacity-50 transform scale-95"
          )}>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                Dry Waste
              </CardTitle>
              <p className="text-muted-foreground">
                Non-biodegradable waste that can be recycled or requires special disposal
              </p>
            </CardHeader>
            <CardContent className="p-6">
              {showDryWaste && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dryWasteItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-foreground">{item.name}</span>
                        <Badge className={getBadgeColor(item.color)}>
                          {item.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Disposal Tips:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Clean containers before recycling</li>
                      <li>• Remove labels when possible</li>
                      <li>• Separate different materials</li>
                      <li>• Take e-waste to special collection centers</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wet Waste Section */}
          <Card className={cn(
            "transition-all duration-500 border-border",
            showWetWaste ? "opacity-100 transform-none" : "opacity-50 transform scale-95"
          )}>
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                Wet Waste
              </CardTitle>
              <p className="text-muted-foreground">
                Biodegradable organic waste that can be composted
              </p>
            </CardHeader>
            <CardContent className="p-6">
              {showWetWaste && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {wetWasteItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-foreground">{item.name}</span>
                        <Badge className={getBadgeColor(item.color)}>
                          {item.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Composting Tips:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Start a home compost bin</li>
                      <li>• Mix green and brown materials</li>
                      <li>• Turn compost regularly for aeration</li>
                      <li>• Avoid meat and dairy in compost</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Best Practices */}
        <Card className="mt-12 border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Best Practices for Waste Segregation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗂️</span>
                </div>
                <h3 className="font-semibold mb-2">Separate at Source</h3>
                <p className="text-sm text-muted-foreground">
                  Use different bins for different types of waste right from your home or office.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧽</span>
                </div>
                <h3 className="font-semibold mb-2">Clean Before Disposal</h3>
                <p className="text-sm text-muted-foreground">
                  Rinse containers and remove food residue to improve recycling quality.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold mb-2">Learn Local Rules</h3>
                <p className="text-sm text-muted-foreground">
                  Check your local waste management guidelines for specific requirements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SegregationGuide;