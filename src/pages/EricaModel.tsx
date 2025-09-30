import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dimensions } from '@/data/evaluationDimensions';
import { DimensionRow } from '@/components/evaluation/DimensionRow';
import { DimensionDetail } from '@/components/evaluation/DimensionDetail';
import Layout from '@/components/Layout';

const EricaModel = () => {
  const [expandedDimension, setExpandedDimension] = useState<number | null>(null);

  usePageTitle({
    title: "ERICA AI能力模型",
    description: "ERICA AI能力评估模型，评估AI时代人才能力维度和典型职业发展方向"
  });

  const handleRowClick = (dimensionId: number) => {
    setExpandedDimension(expandedDimension === dimensionId ? null : dimensionId);
  };

  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10">
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
          {/* Interactive Table */}
          <Card className="border bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-b border-border/50">
              <CardTitle className="text-2xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                ERICA 能力评估标准
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                ERICA AI Evaluation Model
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="table-fixed w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 hover:from-muted/40 hover:via-muted/30 hover:to-muted/40">
                      <TableHead className="w-[25%] font-semibold text-foreground/90">能力维度</TableHead>
                      <TableHead className="w-[40%] font-semibold text-foreground/90">解释说明</TableHead>
                      <TableHead className="w-[35%] text-left font-semibold text-foreground/90">典型职业</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dimensions.map((dimension) => (
                      <React.Fragment key={dimension.id}>
                        <DimensionRow
                          dimension={dimension}
                          isExpanded={expandedDimension === dimension.id}
                          onToggle={() => handleRowClick(dimension.id)}
                        />
                        {expandedDimension === dimension.id && (
                          <DimensionDetail
                            dimension={dimension}
                            onClose={() => setExpandedDimension(null)}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Copyright Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              * Erica模型受到美国专利法和中国软件著作法保护
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EricaModel;
