import { Button } from '@/components/ui/button';
import moment from 'moment';
import React from 'react';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({ candidateList }) {
  if (!Array.isArray(candidateList)) return null;

  const getRatingColor = (rating) => {
    if (rating === null || rating === undefined) return 'text-gray-400';
    if (rating >= 7) return 'text-green-500';
    if (rating >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div>
      <h2 className="font-bold my-5 text-lg sm:text-xl">Candidates ({candidateList?.length})</h2>
      {candidateList?.map((candidate, index) => {
        const rating = candidate?.feedback?.feedback?.rating?.overallRating;
        return (
          <div
            key={index}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-lg mb-5 text-sm sm:text-base"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <h2 className="bg-primary p-3 px-4 font-bold text-white rounded-full text-base sm:text-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                {candidate.userName[0]}
              </h2>
              <div>
                <h2 className="font-bold text-base sm:text-lg">{candidate?.userName}</h2>
                <h2 className="text-xs sm:text-sm text-gray-500">
                  Completed On: {moment(candidate?.created_at).format('MMM DD, yyyy')}
                </h2>
              </div>
            </div>

            <div className={`flex items-center gap-3 justify-start sm:justify-end ${getRatingColor(rating)}`}>
              <h2 className="text-base sm:text-lg font-bold">
                <span>{rating ?? '?'}/10</span>
              </h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidateList;
