import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUpdateBioMutation } from '@/graphql/generated';
import { CircleQuestionMark } from 'lucide-react';
import { useState } from 'react';

const EditBio = ({ bio }: { bio: string | null | undefined }) => {
  const [UpdateBio] = useUpdateBioMutation();
  const [newBio, setNewBio] = useState(bio || '');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleBioUpdate = async () => {
    setLoading(true);
    try {
      const res = await UpdateBio({
        variables: { bio: newBio },
        refetchQueries: ['CurrentUser'],
      });
      if (res.data?.UpdateBio) setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div>{bio || 'Био алга'}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex items-center gap-2">
          <div>Био засах</div>
          <span className="text-muted-foreground italic text-xs">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleQuestionMark size={15} />
                </TooltipTrigger>
                <TooltipContent>
                  {' '}
                  (Shift + Enter дарж шинэ мөр дээр шилжээрэй. Болохоороо Enter
                  дараарай!)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </DialogTitle>
        <Textarea
          disabled={loading}
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          placeholder="Таны био"
          className="w-full h-64 p-2 border rounded"
          rows={12}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleBioUpdate();
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditBio;
