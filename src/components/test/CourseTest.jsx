import React from "react";
import { useCourseData } from "../../hooks/useCourseDataFixed";
import { Loader, AlertCircle, Clock, Users, Award } from "lucide-react";

const CourseTest = () => {
  const { courses, loading, error, refetch } = useCourseData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading course data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Chess Course Test
          </h1>
          <p className="text-gray-300 mb-4">
            Testing CSV data integration for chess courses
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 rounded-full border border-green-500">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-sm text-green-300">
              {courses.length} courses loaded from CSV
            </span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
            >
              {/* Course Header */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2 capitalize">
                  {course.title}
                </h3>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {course.priceDisplay}
                </div>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium capitalize">
                  {course.category}
                </span>
              </div>

              {/* Course Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>
                    {course.pertemuan} • {course.jamPelatihan}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">{course.keterangan}</span>
                </div>

                {course.promo && (
                  <div className="flex items-center gap-2 text-yellow-300">
                    <Award className="w-4 h-4" />
                    <span className="text-xs">
                      {course.promo.replace(/"/g, "")}
                    </span>
                  </div>
                )}

                {course.syarat && (
                  <div className="text-xs text-gray-400">
                    <strong>Syarat:</strong> {course.syarat}
                  </div>
                )}
              </div>

              {/* Materi Preview */}
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-300 font-medium mb-1">
                  Materi:
                </p>
                <p className="text-xs text-gray-400 line-clamp-3">
                  {course.materi}
                </p>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 rounded-lg text-sm font-medium transition-all duration-200">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-12 text-center">
          <button
            onClick={refetch}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Refresh Data
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Debug: {courses.length} courses loaded successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseTest;
