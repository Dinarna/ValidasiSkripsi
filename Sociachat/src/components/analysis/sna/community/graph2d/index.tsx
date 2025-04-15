import { useEffect, useRef, useState } from "react";
import ForceGraph2D, {
  ForceGraphMethods,
  NodeObject,
  LinkObject,
} from "react-force-graph-2d";

interface CommunityNode extends NodeObject {
  id: string | number;
  name?: string;
  community: number;
}

interface CommunityLink extends LinkObject<CommunityNode> {
  source: string | number | CommunityNode;
  target: string | number | CommunityNode;
}

interface GraphCommunityProps {
  community: {
    nodes: CommunityNode[];
    links: CommunityLink[];
  };
}

const Graph2DCommunity: React.FC<GraphCommunityProps> = ({ community }) => {
  const fgRef = useRef<
    | ForceGraphMethods<
        NodeObject<CommunityNode>,
        LinkObject<CommunityNode, CommunityLink>
      >
    | undefined
  >(undefined); // Corrected type

  const [numCommunities, setNumCommunities] = useState(0);

  const getColorByCommunity = (communityId: number, numCommunities: number) => {
    const colors: string[] = [];
    for (let i = 0; i < numCommunities; i++) {
      const hue = (i * 360) / numCommunities;
      colors.push(`hsl(${hue}, 100%, 50%)`);
    }
    return colors[communityId % colors.length];
  };

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge")?.strength(-200); // Accessing d3Force correctly
    }

    const communitySet = new Set(community.nodes.map((node) => node.community));
    setNumCommunities(communitySet.size);
  }, [community]);

  return (
    <ForceGraph2D
      ref={fgRef}
      width={761}
      height={350}
      graphData={community}
      nodeLabel="id"
      onNodeClick={(node) => window.open(node.profile_url, "_blank")}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name as string;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = getColorByCommunity(
          node.community as number,
          numCommunities
        );
        ctx.beginPath();
        ctx.arc(node.x as number, node.y as number, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.stroke();
        ctx.fillStyle = "black";
        // Uncomment if you want to display node labels
        // ctx.fillText(label, node.x as number, (node.y as number) + 8);
      }}
    />
  );
};

export default Graph2DCommunity;
