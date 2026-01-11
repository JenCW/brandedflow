"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Phone, MessageCircle, Mail, Clock, ArrowRight, CheckCircle, Video } from "lucide-react";
import { useState } from "react";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

const meetingTypes = [
  { id: "phone", label: "Phone Call", icon: Phone, duration: "15 min", description: "Quick intro call to discuss your goals" },
  { id: "video", label: "Video Consultation", icon: Video, duration: "30 min", description: "In-depth video consultation with screen sharing" },
  { id: "inperson", label: "In-Person Meeting", icon: Calendar, duration: "45 min", description: "Meet at our Santa Ana office" },
];

export default function BookingPage() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Generate next 14 days
  const getNext14Days = () => {
    const days = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
        days.push({
          date: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNum: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' })
        });
      }
    }
    return days.slice(0, 10);
  };

  const availableDays = getNext14Days();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Schedule A Consultation</p>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
            data-testid="text-book-title"
          >
            Book With Enzo
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Choose a time that works for you. No pressure, just a conversation about your goals.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12">
            
            {/* Step 1: Meeting Type */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                Select Meeting Type
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {meetingTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-6 border text-left transition-all hover-card-grow ${
                      selectedType === type.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                    data-testid={`button-meeting-${type.id}`}
                  >
                    <type.icon className={`w-8 h-8 mb-4 ${selectedType === type.id ? 'text-primary' : 'text-zinc-400'}`} />
                    <h3 className="text-white font-bold mb-1">{type.label}</h3>
                    <p className="text-primary text-sm mb-2">{type.duration}</p>
                    <p className="text-zinc-400 text-sm">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Date */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                Select Date
              </h2>
              <div className="flex flex-wrap gap-3">
                {availableDays.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`w-20 p-4 border text-center transition-all ${
                      selectedDate === day.date 
                        ? 'border-primary bg-primary/10' 
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                    data-testid={`button-date-${day.date}`}
                  >
                    <div className="text-zinc-400 text-xs uppercase">{day.dayName}</div>
                    <div className={`text-2xl font-bold ${selectedDate === day.date ? 'text-primary' : 'text-white'}`}>
                      {day.dayNum}
                    </div>
                    <div className="text-zinc-500 text-xs">{day.month}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Time */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                Select Time
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 border text-center transition-all text-sm ${
                      selectedTime === time 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600'
                    }`}
                    data-testid={`button-time-${time.replace(/\s/g, '-')}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact Info */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  data-testid="input-book-firstname"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  data-testid="input-book-lastname"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  data-testid="input-book-email"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  data-testid="input-book-phone"
                />
              </div>
              <textarea
                placeholder="Tell us briefly about your goals (optional)"
                rows={3}
                className="w-full mt-4 px-4 py-4 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:border-primary focus:outline-none resize-none"
                data-testid="textarea-book-goals"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-zinc-400 text-sm">
                {selectedType && selectedDate && selectedTime && (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {meetingTypes.find(t => t.id === selectedType)?.label} on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
                  </span>
                )}
              </div>
              <button
                className="btn-luxury w-full sm:w-auto"
                data-testid="button-book-confirm"
              >
                Confirm Booking <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide">
            Prefer Another Way to Connect?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="tel:+17145551234" className="flex flex-col items-center p-6 bg-zinc-800/50 border border-zinc-700 hover:border-primary/50 transition-colors" data-testid="link-contact-phone">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <span className="text-white font-medium">Call Now</span>
              <span className="text-zinc-400 text-sm">(714) 555-1234</span>
            </a>
            <a href="sms:+17145551234" className="flex flex-col items-center p-6 bg-zinc-800/50 border border-zinc-700 hover:border-primary/50 transition-colors" data-testid="link-contact-text">
              <MessageCircle className="w-8 h-8 text-primary mb-4" />
              <span className="text-white font-medium">Text Us</span>
              <span className="text-zinc-400 text-sm">Quick response</span>
            </a>
            <a href="mailto:smahmoud@emortgagecapital.com" className="flex flex-col items-center p-6 bg-zinc-800/50 border border-zinc-700 hover:border-primary/50 transition-colors" data-testid="link-contact-email">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <span className="text-white font-medium">Email</span>
              <span className="text-zinc-400 text-sm">smahmoud@emortgagecapital.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-16 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-8 items-center text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>5-Minute Callback Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>No Obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Free Consultation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
