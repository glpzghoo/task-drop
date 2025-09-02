import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TaskApplications } from '@/graphql/generated';
import { format } from 'date-fns';
import { Star } from 'lucide-react';
import AcceptOffer from './AcceptOffer';
import { Button } from '@/components/ui/button';

const Applications = ({ application }: { application: TaskApplications }) => {
  const taskOwner = application.posterId === localStorage.getItem('userId');
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={application.helper.profileImageUrl || '/placeholder.svg'}
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
                {application.helper.firstName} {application.helper.lastName}
              </h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{application.helper.helperRating}</span>
                  <span>({application.helper.helperRatingCount})</span>
                </div>
                <span>
                  {application.helper.tasksCompleted} ажил гүйцэтгэсэн
                </span>
                {/* <span>
                              {application.helper.completionRate}% гүйцэтгэл
                            </span> */}
              </div>
            </div>

            <div className="text-right text-sm text-muted-foreground">
              <div>
                Хүсэлт илгээсэн:{' '}
                {format(Number(application.appliedAt), 'yyyy-MM-dd HH:mm')}
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

          <p className="text-foreground/90 mb-3">{application.message}</p>

          {taskOwner && (
            <div className="flex flex-wrap gap-2">
              <AcceptOffer taskApplicationId={application.id} />
              <Button size="sm" variant="outline" className="border-border">
                Профайл харах
              </Button>
              <Button size="sm" variant="outline" className="border-border">
                Мессеж бичих
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
