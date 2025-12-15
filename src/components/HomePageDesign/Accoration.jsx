import React from 'react';

const Accoration = () => {
  return (
    <div className="lg:px-40">
      <h2 className="text-2xl font-bold text-center text-blue-300 mb-8">
        Frequently Asked Questions by Users
      </h2>

      <div className="collapse collapse-plus bg-blue-50 border border-base-300">
        <input type="radio" name="club-accordion" defaultChecked />
        <div className="collapse-title font-semibold">
          Why should I join ClubSphere?
        </div>
        <div className="collapse-content text-sm">
          ClubSphere connects you with clubs and communities based on your interests—sports, gaming, travel, tech, photography, and more. 
          Meet like-minded people, attend events, and participate in club activities to grow your network and skills.
        </div>
      </div>

      <div className="collapse collapse-plus bg-blue-50 border border-base-300">
        <input type="radio" name="club-accordion" />
        <div className="collapse-title font-semibold">
          Are clubs free to join?
        </div>
        <div className="collapse-content text-sm">
          Many clubs are free to join, while some may have membership fees for premium access, events, or resources. 
          You can check the fee for each club before joining and pay securely through our platform.
        </div>
      </div>

      <div className="collapse collapse-plus bg-blue-50 border border-base-300">
        <input type="radio" name="club-accordion" />
        <div className="collapse-title font-semibold">
          How do I join a club?
        </div>
        <div className="collapse-content text-sm">
          Browse clubs by category or search for a club of your interest. Click on the club to see details, upcoming events, and membership info. 
          Click "Join" or "Register" and follow the instructions to become a member.
        </div>
      </div>

      <div className="collapse collapse-plus bg-blue-50 border border-base-300">
        <input type="radio" name="club-accordion" />
        <div className="collapse-title font-semibold">
          How do I participate in club events?
        </div>
        <div className="collapse-content text-sm">
          Once you are a member of a club, you can view upcoming events organized by that club. Click "Register" for the event, and you will receive all details. 
          Some events may require payment, which can be completed securely through ClubSphere.
        </div>
      </div>

      <div className="collapse collapse-plus bg-blue-50 border border-base-300">
        <input type="radio" name="club-accordion" />
        <div className="collapse-title font-semibold">
          Can I manage my own club?
        </div>
        <div className="collapse-content text-sm">
          Yes! If you have a club or want to start one, you can create it on ClubSphere. Manage memberships, events, and payments easily through your manager dashboard.
        </div>
      </div>
    </div>
  );
};

export default Accoration;
