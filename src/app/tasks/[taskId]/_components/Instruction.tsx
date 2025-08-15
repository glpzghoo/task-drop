import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flag, Shield } from 'lucide-react';

const Instruction = () => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Аюулгүй байдлыг нэн тэргүүнд
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-gray-400">
          <p>• Эхлээд олон нийтийн газар уулзах</p>
          <p>• Ажил эхлэхээс өмнө үнэмлэх шалгах</p>
          <p>• TaskDrop доторх чат ашиглах</p>
          <p>• Сэжигтэй үйлдлийг мэдээлэх</p>
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 border-gray-700 text-white hover:bg-gray-800 bg-transparent"
        >
          <Flag className="w-4 h-4 mr-2" />
          Асуудал мэдээлэх
        </Button>
      </CardContent>
    </Card>
  );
};

export default Instruction;
