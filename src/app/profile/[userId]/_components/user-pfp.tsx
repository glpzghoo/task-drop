'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, useUploadPfpMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { useEffect, useRef, useState } from 'react';

const UserPFP = ({ user }: { user: Users }) => {
  const [UploadPfp, { data, error }] = useUploadPfpMutation();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fakeURL, setFakeURL] = useState('');
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const sendFile = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('id', user.id || 'anon');
      const response = await fetch('/api/upload_pfp', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) return;
      const { url } = await response.json();

      await UploadPfp({
        variables: { pfp: url },
        refetchQueries: ['CurrentUser'],
      });
      setFakeURL(url);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (data) setSnackbar({ message: 'Амжилттай!', success: true });
    if (error) setSnackbar({ message: error.message, success: false });
  }, [data, error]);

  return (
    <div className="relative">
      {snackbar && (
        <CustomSnackBar
          value={snackbar.message}
          success={snackbar.success}
          onClose={() => setSnackbar(null)}
        />
      )}
      <Avatar onClick={handleInput} className="w-32 h-32">
        <AvatarImage
          className=" object-cover"
          src={fakeURL ? fakeURL : user.profileImageUrl || '/placeholder.svg'}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <AvatarFallback className="text-2xl">
          {user.firstName[0]}
          {user.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <Input
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const fakeUrl = URL.createObjectURL(file);
          setSelectedFile(file);
          setFakeURL(fakeUrl);
        }}
        ref={inputRef}
        className=" hidden "
        type="file"
      />
      {selectedFile && (
        <Button onClick={sendFile} className="mt-2" disabled={loading}>
          {loading ? 'Хадгалж байна...' : 'Хадгалах'}
        </Button>
      )}
      {user.availableNow && (
        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          Бэлэн байна
        </div>
      )}
    </div>
  );
};

export default UserPFP;
