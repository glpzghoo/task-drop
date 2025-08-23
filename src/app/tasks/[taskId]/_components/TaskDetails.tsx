import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Navigation, Star } from 'lucide-react';
import { timeUntilDue } from '../utils/helpers';
import { Button } from '@/components/ui/button';
import { Task } from '@/graphql/generated';
import { format } from 'date-fns';
import AcceptOffer from './AcceptOffer';

const TaskDetails = ({ task }: { task: Task }) => {
  const taskOwner = task.posterId === localStorage.getItem('userId');
  return (
    <Tabs defaultValue="details" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 rounded-md bg-card border border-border">
        <TabsTrigger
          value="details"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Дэлгэрэнгүй
        </TabsTrigger>
        <TabsTrigger
          value="applications"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Хүсэлт ({task.applications.length})
        </TabsTrigger>
        <TabsTrigger
          value="location"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Байршил
        </TabsTrigger>
      </TabsList>

      {/* Дэлгэрэнгүй таб */}
      <TabsContent value="details" className="space-y-6">
        <Card className=" border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Ажлын тайлбар</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {task.description}
            </p>

            {task.requirements && (
              <>
                <h3 className="font-semibold text-foreground mb-3">
                  Шаардлагууд
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {task.requirements}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Ажлын мэдээлэл / статистик */}
        <Card className=" border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Ажлын мэдээлэл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Хугацаа</span>
                  <span className="text-foreground font-medium">
                    {task.estimatedDuration} минут
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Төлбөр</span>
                  <span className="text-foreground font-medium">
                    ₮{task.paymentAmount}
                  </span>
                </div>
                {task.isUrgent && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Яаралтайгийн шимтгэл
                    </span>
                    <span className="text-foreground font-medium">
                      +₮{task.urgencyFee}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Нийт төлбөр</span>
                  <span className="text-foreground font-bold text-lg">
                    ₮
                    {Math.floor(
                      task.paymentAmount +
                        (task.isUrgent ? task.urgencyFee || 0 : 0)
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Өргөдлийн тоо</span>
                  <span className="text-foreground font-medium">
                    {task.applications.length}/{task.maxApplications}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Төлөв</span>
                  <Badge
                    variant="outline"
                    className="border-border text-muted-foreground"
                  >
                    {task.status === 'open'
                      ? 'Нээлттэй'
                      : task.status === 'assigned'
                        ? 'Хүн авсан'
                        : task.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Дуусгах огноо</span>
                  <span className="text-foreground font-medium">
                    {timeUntilDue(task.dueDate).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Хүсэлт таб */}
      <TabsContent value="applications" className="space-y-6">
        <Card className=" border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Хүсэлт ({task.applications.length})
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Энэ ажилд хүсэлт гаргасан хүмүүс
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {task.applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={
                          application.helper.profileImageUrl ||
                          '/placeholder.svg'
                        }
                      />
                      <AvatarFallback>
                        {application.helper.firstName[0]}
                        {application.helper.lastName[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {application.helper.firstName}{' '}
                            {application.helper.lastName}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{application.helper.helperRating}</span>
                              <span>
                                ({application.helper.helperRatingCount})
                              </span>
                            </div>
                            <span>
                              {application.helper.tasksCompleted} ажил
                              гүйцэтгэсэн
                            </span>
                            {/* <span>
                              {application.helper.completionRate}% гүйцэтгэл
                            </span> */}
                          </div>
                        </div>

                        <div className="text-right text-sm text-muted-foreground">
                          <div>
                            Хүсэлт илгээсэн:{' '}
                            {format(
                              Number(application.appliedAt),
                              'yyyy-MM-dd HH:mm'
                            )}
                          </div>
                          <div>
                            Эхлэх боломжтой:{' '}
                            {format(
                              Number(application.proposedStartTime),
                              'yyyy-MM-dd HH:mm'
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-foreground/90 mb-3">
                        {application.message}
                      </p>

                      {taskOwner && (
                        <div className="flex flex-wrap gap-2">
                          <AcceptOffer taskApplicationId={application.id} />
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border"
                          >
                            Профайл харах
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border"
                          >
                            Мессеж бичих
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Байршил таб */}
      <TabsContent value="location" className="space-y-6">
        <Card className=" border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Байршлын мэдээлэл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground/90">
                <MapPin className="w-5 h-5" />
                <span>{task.address}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/90">
                <Navigation className="w-5 h-5" />
                <span>
                  Capitol Hill орчим — ойролцоо цэцэрлэгт хүрээлэн олон
                </span>
              </div>

              {/* Газрын зураг placeholder */}
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Энд интерактив газрын зураг харагдана</p>
                  <p className="text-sm">
                    Хувийн нууцын үүднээс ойролцоогоор харуулж байна
                  </p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Нарийн хаяг ажлыг зөвшөөрсний дараа илгээгдэнэ</p>
                <p>• Байршлыг ойролцоогоор харуулж байна</p>
                <p>• Capitol Hill галт тэрэгний буудлаас алхах зайд</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TaskDetails;
