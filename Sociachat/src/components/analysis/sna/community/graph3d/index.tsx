import { useEffect, useRef } from "react";
import ForceGraph3D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from "react-force-graph-3d";

interface CommunityNode extends NodeObject {
  id: string | number;
  name?: string;
  community: number;
  profile_url: string;
}

interface CommunityLink extends LinkObject {
  source: string | number | CommunityNode;
  target: string | number | CommunityNode;
}

interface GraphCommunityProps {
  community: {
    nodes: CommunityNode[];
    links: CommunityLink[];
  };
}

const Graph3DCommunity: React.FC<GraphCommunityProps> = ({ community }) => {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined); // Corrected type

  useEffect(() => {
    if (fgRef.current) {
      // Set the camera position to be closer to the nodes
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 400 });
    }
  }, [community]);

  const generateColorPalette = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = (i * 360) / numColors;
      colors.push(`hsl(${hue}, 100%, 50%)`);
    }
    return colors;
  };

  const uniqueCommunities = [
    ...new Set(community.nodes.map((node) => node.community)),
  ];

  const communityColors = generateColorPalette(uniqueCommunities.length);

  const getNodeColor = (community: number) => {
    const communityIndex = uniqueCommunities.indexOf(community);
    return communityColors[communityIndex];
  };

  return (
    <ForceGraph3D
      ref={fgRef}
      width={761}
      height={350}
      graphData={community}
      nodeColor={(node) => getNodeColor((node as CommunityNode).community)}
      linkDirectionalParticleColor={() => "red"}
      linkDirectionalParticleWidth={6}
      linkHoverPrecision={10}
      onNodeClick={(node) =>
        window.open((node as CommunityNode).profile_url, "_blank")
      }
    />
  );
};

export default Graph3DCommunity;
