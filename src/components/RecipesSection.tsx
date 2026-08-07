import React, { useState } from 'react';
import { 
  Utensils, 
  Clock, 
  Users, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  BookOpen
} from 'lucide-react';
import { Recipe } from '../types';

interface RecipesSectionProps {
  recipes: Recipe[];
  onSelectProduct: (productId: string) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({ recipes, onSelectProduct }) => {
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(recipes[0]?.id || null);

  return (
    <section className="bg-[#FDF5E6] border-t border-[#800000]/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#800000] font-serif text-xs uppercase tracking-widest font-bold">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>Shiv Culinary Kitchen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black italic text-[#121212]">
            Royal Dairy Recipes & Kitchen Magic
          </h2>
          <p className="text-xs sm:text-sm text-[#121212]/70">
            Discover authentic Indian recipes made delicious with Shiv Pure Malai Paneer, A2 Milk, and Bilona Desi Ghee.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => {
            const isExpanded = expandedRecipeId === recipe.id;

            return (
              <div
                key={recipe.id}
                className="bg-white border border-[#800000]/10 rounded-3xl overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/9] bg-[#FDF5E6] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#800000] text-[#FDF5E6] backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#D4AF37]/30">
                    Difficulty: {recipe.difficulty}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#121212]">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-[#800000] font-medium mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Prep: {recipe.prepTime} | Cook: {recipe.cookTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Serves {recipe.servings}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedRecipeId(isExpanded ? null : recipe.id)}
                    className="w-full bg-[#FDF5E6] hover:bg-[#800000] text-[#800000] hover:text-[#FDF5E6] border border-[#800000]/20 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition flex items-center justify-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Recipe Steps' : 'View Full Recipe & Ingredients'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="space-y-3 pt-2 text-xs border-t border-[#800000]/10 animate-fadeIn">
                      <div>
                        <div className="font-bold text-[#800000] uppercase tracking-wider mb-1">Ingredients:</div>
                        <ul className="list-disc list-inside space-y-1 text-[#121212]/80">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx}>{ing}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="font-bold text-[#800000] uppercase tracking-wider mb-1">Step-by-Step Method:</div>
                        <ol className="list-decimal list-inside space-y-1 text-[#121212]/80">
                          {recipe.steps.map((st, idx) => (
                            <li key={idx}>{st}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
