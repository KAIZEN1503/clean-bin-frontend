import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, TreePine, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-banner.jpg";

const Home = () => {
  const features = [
    {
      icon: <Recycle className="w-8 h-8 text-primary" />,
      title: "Smart Segregation",
      description: "Learn how to properly segregate waste for maximum recycling efficiency."
    },
    {
      icon: <TreePine className="w-8 h-8 text-primary" />,
      title: "Save Environment",
      description: "Every piece of waste properly sorted helps reduce environmental impact."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Community Impact",
      description: "Join thousands of others making a difference in waste management."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Segregate Waste,
            <span className="block text-primary-glow">Save Earth</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Transform your waste management habits with our smart segregation guide and tools. Every action counts towards a cleaner future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/guide">
              <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground text-lg px-8 py-3 h-auto">
                Start Learning
              </Button>
            </Link>
            <Link to="/upload">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 h-auto"
              >
                Try Waste Detection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Waste Segregation */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Waste Segregation Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proper waste segregation is the first step towards effective recycling and environmental conservation. 
              It reduces landfill waste, saves energy, and creates a sustainable future for generations to come.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-8 text-center text-primary-foreground">
            <h3 className="text-3xl font-bold mb-6">Making a Real Impact</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">75%</div>
                <div className="text-primary-foreground/80">Waste can be recycled with proper segregation</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50%</div>
                <div className="text-primary-foreground/80">Reduction in landfill waste</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30%</div>
                <div className="text-primary-foreground/80">Energy saved through recycling</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;