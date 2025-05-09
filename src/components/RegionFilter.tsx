
import React from 'react';
import { Button } from "@/components/ui/button";

interface RegionFilterProps {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">지역 필터</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedRegion === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectRegion(null)}
          className={`rounded-full ${selectedRegion === null ? "bg-korea-blue" : ""}`}
        >
          전체
        </Button>
        
        {regions.map((region) => (
          <Button
            key={region}
            variant={selectedRegion === region ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectRegion(region)}
            className={`rounded-full ${selectedRegion === region ? "bg-korea-blue" : ""}`}
          >
            {region}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RegionFilter;
